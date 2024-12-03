from pathlib import Path

def main():
    # Create js-dos directory
    Path('js-dos').mkdir(exist_ok=True)
    print("Directory structure created successfully!")

if __name__ == "__main__":
    main()
