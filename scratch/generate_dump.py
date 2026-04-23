import os

def generate_dump():
    root_dir = r"c:\Users\gurur\OneDrive\Desktop\My Projects\Hexavault"
    output_file = os.path.join(root_dir, "HEXAVAULT_SOURCE_DUMP.txt")
    
    # Files and directories to include
    include_paths = [
        "package.json",
        "vite.config.js",
        "postcss.config.js",
        "tailwind.config.js",
        "src/index.css",
        "src/App.jsx",
        "src/main.jsx",
        "src/components",
        "src/pages"
    ]
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("# HEXAVAULT PROJECT SOURCE DUMP\n")
        f.write("# Generated for Claude analysis\n\n")
        
        for path in include_paths:
            full_path = os.path.join(root_dir, path)
            if not os.path.exists(full_path):
                continue
            
            if os.path.isfile(full_path):
                append_file(f, full_path, path)
            elif os.path.isdir(full_path):
                for root, dirs, files in os.walk(full_path):
                    for file in files:
                        if file.endswith(('.jsx', '.css', '.js', '.json')):
                            file_full_path = os.path.join(root, file)
                            rel_path = os.path.relpath(file_full_path, root_dir)
                            append_file(f, file_full_path, rel_path)

    print(f"Dump generated at: {output_file}")

def append_file(f, full_path, rel_path):
    f.write(f"\n{'='*80}\n")
    f.write(f"FILE: {rel_path}\n")
    f.write(f"{'='*80}\n\n")
    try:
        with open(full_path, 'r', encoding='utf-8') as src:
            f.write(src.read())
    except Exception as e:
        f.write(f"ERROR READING FILE: {e}")
    f.write("\n\n")

if __name__ == "__main__":
    generate_dump()
