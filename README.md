# SolSync

## Contributing

Before contributing, please run the setup-branch-protection.sh script so that you can't commit directly to the main branch.

```bash
./setup-branch-protection.sh
```

If needed, give the script executable permissions using the following command:

```bash
chmod +x setup-branch-protection.sh
```

If on Windows, you can run the script using Git Bash. Note, you may need to add Git Bash to your PATH if the `sh` command is not recognized.

```bash
sh setup-branch-protection.sh
```

If these fail, manually create a .git/hooks/pre-commit file with the following content:

```bash
#!/bin/bash

# File location: SolSync/.git/hooks/pre-commit
branch="$(git rev-parse --abbrev-ref HEAD)"

if [ "$branch" = "main" ]; then
  echo "You can't commit directly to the main branch."
  echo "This is done so that you cannot bypass our CI/CD pipeline before affecting the main branch."
  echo "Please create your own branch with the command 'git checkout -b <branch-name>'"
  echo "Once you are done with your work, open a pull request to merge your branch into the main branch."
  exit 1
fi
```
