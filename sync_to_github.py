# AlanCodecoding 自动同步脚本

# 使用方法:
#   python sync_to_github.py                  # 同步所有变更
#   python sync_to_github.py --dry-run        # 预览变更（不实际推送）
#   python sync_to_github.py --token <token>  # 指定 token

import requests, json, base64, os, hashlib, sys

# ====== 配置 ======
REPO = "AlanHYL/kimi-alan-codecoding"
# 本地 Skill 目录
SKILL_DIR = os.path.expanduser(r"~/.kimi-code/skills/alan-codecoding")
# 需要同步的文件和目录模式
INCLUDE_PATTERNS = [
    "*.md", "*.json", "*.py", ".gitignore",
]
# 排除的文件
EXCLUDE = [
    ".git/**", "__pycache__/**", "*.pyc", 
    "publish_to_github.py", "push_to_github.py", "push_files.py",
    "node_modules/**",
]

def get_token():
    """获取 GitHub Token"""
    # 优先从命令行参数读取
    for i, arg in enumerate(sys.argv):
        if arg == "--token" and i + 1 < len(sys.argv):
            return sys.argv[i + 1]
    
    # 从环境变量读取
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        return token
    
    # 从本地配置文件读取
    config_path = os.path.join(SKILL_DIR, ".github-token")
    if os.path.exists(config_path):
        with open(config_path) as f:
            return f.read().strip()
    
    return None

def get_local_files():
    """扫描本地 Skill 目录，返回 {相对路径: 文件内容(bytes)}"""
    files = {}
    skill_dir = os.path.abspath(SKILL_DIR)
    
    for root, dirs, fnames in os.walk(skill_dir):
        # 跳过排除目录
        dirs[:] = [d for d in dirs if d not in (".git", "__pycache__", "node_modules")]
        
        for fname in fnames:
            # 跳过排除文件
            if fname in ("publish_to_github.py", "push_to_github.py", "push_files.py"):
                continue
            if fname.endswith(".pyc"):
                continue
            
            filepath = os.path.join(root, fname)
            relpath = os.path.relpath(filepath, skill_dir).replace("\\", "/")
            
            with open(filepath, "rb") as f:
                content = f.read()
            
            files[relpath] = content
    
    return files

def get_remote_files(token):
    """获取 GitHub 上现有文件列表，返回 {相对路径: sha}"""
    headers = {"Authorization": f"token {token}"}
    url = f"https://api.github.com/repos/{REPO}/git/trees/main?recursive=1"
    
    resp = requests.get(url, headers=headers)
    if resp.status_code != 200:
        print(f"❌ 无法获取远程文件列表: {resp.json().get('message', 'unknown')}")
        return {}
    
    files = {}
    for item in resp.json().get("tree", []):
        if item["type"] == "blob":
            files[item["path"]] = item["sha"]
    
    return files

def sync(token, dry_run=False):
    """同步本地变更到 GitHub"""
    headers = {"Authorization": f"token {token}", "Content-Type": "application/json"}
    api_content = f"https://api.github.com/repos/{REPO}/contents"
    
    local_files = get_local_files()
    remote_files = get_remote_files(token)
    
    local_paths = set(local_files.keys())
    remote_paths = set(remote_files.keys())
    
    # 需要新建的文件（本地有，远程没有）
    to_create = local_paths - remote_paths
    # 需要更新的文件（本地有，远程有，但内容不同）
    to_update = set()
    # 需要删除的文件（远程有，本地没有）
    to_delete = remote_paths - local_paths
    
    # 检查内容是否变更
    for path in local_paths & remote_paths:
        local_content = local_files[path]
        # 通过文件大小 + 内容 hash 判断是否变更
        local_hash = hashlib.md5(local_content).hexdigest()
        # 下载远程文件内容来比较
        resp = requests.get(f"{api_content}/{path}", headers=headers, params={"ref": "main"})
        if resp.status_code == 200:
            remote_content_b64 = resp.json().get("content", "").replace("\n", "")
            try:
                remote_content = base64.b64decode(remote_content_b64)
                remote_hash = hashlib.md5(remote_content).hexdigest()
                if local_hash != remote_hash:
                    to_update.add(path)
            except:
                to_update.add(path)  # 无法解码时也视为变更
    
    print(f"\n📊 同步分析:")
    print(f"   本地文件: {len(local_files)}")
    print(f"   远程文件: {len(remote_files)}")
    print(f"   新建: {len(to_create)}")
    print(f"   更新: {len(to_update)}")
    print(f"   删除: {len(to_delete)}")
    
    if not to_create and not to_update and not to_delete:
        print("\n✅ 没有变更，无需同步")
        return
    
    if dry_run:
        print("\n🔍 Dry-Run 模式 - 预览变更:")
        for p in sorted(to_create):
            print(f"   📄 新建: {p}")
        for p in sorted(to_update):
            print(f"   📝 更新: {p}")
        for p in sorted(to_delete):
            print(f"   🗑️ 删除: {p}")
        return
    
    # 执行同步
    print("\n🔄 开始同步...")
    
    # 新建文件
    for path in sorted(to_create):
        content = local_files[path]
        resp = requests.put(f"{api_content}/{path}", headers=headers, json={
            "message": f"sync: add {path}",
            "content": base64.b64encode(content).decode(),
            "branch": "main"
        })
        status = "✅" if resp.status_code in (200, 201) else "❌"
        print(f"   {status} 新建: {path}")
    
    # 更新文件
    for path in sorted(to_update):
        content = local_files[path]
        # 获取远程文件 SHA
        resp_get = requests.get(f"{api_content}/{path}", headers=headers, params={"ref": "main"})
        remote_sha = resp_get.json().get("sha") if resp_get.status_code == 200 else None
        
        if not remote_sha:
            print(f"   ❌ 更新 {path}: 无法获取远程 SHA")
            continue
        
        resp = requests.put(f"{api_content}/{path}", headers=headers, json={
            "message": f"sync: update {path}",
            "content": base64.b64encode(content).decode(),
            "sha": remote_sha,
            "branch": "main"
        })
        status = "✅" if resp.status_code in (200, 201) else "❌"
        print(f"   {status} 更新: {path}")
    
    # 删除文件
    for path in sorted(to_delete):
        if path.startswith("references/prompts/"):
            # 获取 SHA 再删除
            resp_get = requests.get(f"{api_content}/{path}", headers=headers, params={"ref": "main"})
            remote_sha = resp_get.json().get("sha") if resp_get.status_code == 200 else None
            if remote_sha:
                resp = requests.delete(f"{api_content}/{path}", headers=headers, json={
                    "message": f"sync: delete {path}",
                    "sha": remote_sha,
                    "branch": "main"
                })
                status = "✅" if resp.status_code == 200 else "❌"
                print(f"   {status} 删除: {path}")
            else:
                print(f"   ❌ 删除 {path}: 无法获取 SHA")
    
    print(f"\n✅ 同步完成!")
    print(f"   仓库: https://github.com/{REPO}")

if __name__ == "__main__":
    dry_run = "--dry-run" in sys.argv
    
    token = get_token()
    if not token:
        print("❌ 未找到 GitHub Token!")
        print("")
        print("请设置 Token (任选一种方式):")
        print("  1. 环境变量: export GITHUB_TOKEN=ghp_xxx")
        print(f"  2. 配置文件: echo 'ghp_xxx' > {SKILL_DIR}/.github-token")
        print("  3. 命令行: python sync_to_github.py --token ghp_xxx")
        sys.exit(1)
    
    sync(token, dry_run)
