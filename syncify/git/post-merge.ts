export const template = ({
  FILES_TO_SYNC,
  DIRECTORY_TO_SYNC,
  PRODUCTION_BRANCH,
  TARGET_BRANCHES,
  BRANCHES_TO_MIRROR
}) => /* bash */`#!/bin/bash

# Files to sync
FILES_TO_SYNC=(${FILES_TO_SYNC})

# Directory to sync (ignored by git)
DIRECTORY_TO_SYNC="${DIRECTORY_TO_SYNC}"

# Fetch latest changes from production branch and any other source branches
git fetch origin ${PRODUCTION_BRANCH}

# Dynamically fetch all branches mentioned in branchesToMirror
for TARGET_BRANCH in ${TARGET_BRANCHES}; do
    for SOURCE_BRANCH in ${BRANCHES_TO_MIRROR}; do
        git fetch origin "\${SOURCE_BRANCH}"
    done
done

# Check if the target branches exist, and create them if they do not
for TARGET_BRANCH in ${TARGET_BRANCHES}; do
    if git show-ref --verify --quiet refs/heads/\${TARGET_BRANCH}; then
        echo "\${TARGET_BRANCH} branch exists."
    else
        echo "Creating branch \${TARGET_BRANCH}."
        git checkout -b \${TARGET_BRANCH} origin/${PRODUCTION_BRANCH}
    fi
done

# Switch back to master
git checkout master

# Track whether changes were made
CHANGED_FILES=false

# Sync files from production branch and dynamically defined branches
for file in "\${FILES_TO_SYNC[@]}"; do
    if git diff --name-only ${PRODUCTION_BRANCH} -- "$file" | grep -q "$file"; then
        CHANGED_FILES=true
        git checkout ${PRODUCTION_BRANCH} -- "$file"
    fi
done

# Force merge specific files
for file in "\${FILES_TO_FORCE_MERGE[@]}"; do
    if git diff --name-only ${PRODUCTION_BRANCH} -- "$file" | grep -q "$file"; then
        CHANGED_FILES=true
        git checkout -f ${PRODUCTION_BRANCH} -- "$file"
    fi
done

# If any files have changed, commit the changes
if [ "$CHANGED_FILES" = true ]; then
    git commit -m "Sync changes from ${PRODUCTION_BRANCH} and other branches to master (including force merges)"
else
    echo "No changes detected in the specified files."
fi

# Ensure a clean state before syncing the directory
git checkout ${PRODUCTION_BRANCH}
git reset --hard origin/${PRODUCTION_BRANCH}

# Update the production branch with contents from the ignored directory
echo "Syncing contents from \${DIRECTORY_TO_SYNC} to ${PRODUCTION_BRANCH}"

# Remove existing files in the production branch from the ignored directory
rm -rf "\${DIRECTORY_TO_SYNC}/*"

# Copy contents from the master branch's ignored directory to the production branch
git checkout master -- "\${DIRECTORY_TO_SYNC}/."

# Stage and commit the changes to the production branch
git add "\${DIRECTORY_TO_SYNC}"
git commit -m "Update production branch with contents from \${DIRECTORY_TO_SYNC}"

# Push changes to the production branch
git push origin ${PRODUCTION_BRANCH}

# Mirror changes from dynamically defined branches
for TARGET_BRANCH in ${TARGET_BRANCHES}; do
    for SOURCE_BRANCH in ${BRANCHES_TO_MIRROR}; do
        echo "Mirroring \${SOURCE_BRANCH} to \${TARGET_BRANCH}"

        # Checkout the target branch to mirror
        git checkout "\${TARGET_BRANCH}"

        # Reset the target branch to match the source branch (mirror)
        git reset --hard "\${SOURCE_BRANCH}"

        # Push the changes to remote for the mirrored branch
        git push origin "\${TARGET_BRANCH}"
    done
done

# Switch back to master once the operation is complete
git checkout master

`.trim();
