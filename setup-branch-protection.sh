#!/bin/bash

# This script sets up branch protection for the main branch of the repository.
# It copies the following pre-commit hook script to the .git/hooks directory.

echo "Setting up branch protection for the main branch of the repository..."

echo "#!/bin/bash

branch=\"\$(git rev-parse --abbrev-ref HEAD)\"

if [ \"\$branch\" = \"main\" ]; then
  echo \"You can't commit directly to the main branch.\"
  echo \"This is done so that you cannot bypass our CI/CD pipeline before affecting the main branch.\"
  echo \"Please create your own branch with the command 'git checkout -b <branch-name>'\"
  echo \"Once you are done with your work, open a pull request to merge your branch into the main branch.\"
  exit 1
fi" > .git/hooks/pre-commit

chmod +x .git/hooks/pre-commit

echo "Done!"