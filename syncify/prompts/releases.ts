const fs = require('fs');
const path = require('path');

// Define the config file path
const configPath = path.join(__dirname, 'git-sync-config.json');

// Path to the post-merge hook
const hookPath = path.join(__dirname, '.git/hooks/post-merge');

// Read the configuration file
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Function to generate the fetch commands for branches
const generateFetchCommands = (branchesToMirror) => {
  return Object.keys(branchesToMirror)
  .map(targetBranch => {
    return branchesToMirror[targetBranch].map(sourceBranch => `git fetch origin ${sourceBranch}`).join('\n');
  })
  .join('\n');
};

// Function to generate commands for syncing files
const generateSyncFileCommands = (filesToSync, productionBranch) => {
  return filesToSync.map(file => `
    if git diff --name-only ${productionBranch} -- "${file}" | grep -q "${file}"; then
        CHANGED_FILES=true
        git checkout ${productionBranch} -- "${file}"
    fi`).join('');
};

// Function to generate force merge commands
const generateForceMergeCommands = (filesToForceMerge, productionBranch) => {
  return filesToForceMerge.map(file => `
    if git diff --name-only ${productionBranch} -- "${file}" | grep -q "${file}"; then
        CHANGED_FILES=true
        git checkout -f ${productionBranch} -- "${file}"
    fi`).join('');
};

// Function to generate the post-merge hook script
const generatePostMergeScript = (config) => {
  const {
    productionBranch = 'production',
    filesToSync = [],
    filesToForceMerge = [],
    directoryToSync = '',
    branchesToMirror = {}
  } = config;

  const fetchCommands = generateFetchCommands(branchesToMirror);
  const syncFileCommands = generateSyncFileCommands(filesToSync, productionBranch);
  const forceMergeCommands = generateForceMergeCommands(filesToForceMerge, productionBranch);

  return /* sh */`#!/bin/bash

# Files to sync
FILES_TO_SYNC=(${filesToSync.map(file => `"${file}"`).join(' ')})

# Files to force merge
FILES_TO_FORCE_MERGE=(${filesToForceMerge.map(file => `"${file}"`).join(' ')})

# Directory to sync (ignored by git)
DIRECTORY_TO_SYNC="${directoryToSync}"

# Fetch latest changes from production branch
git fetch origin ${productionBranch}

# Dynamically fetch all branches mentioned in branchesToMirror
${fetchCommands}

# Check if the target branches exist, and create them if they do not
for TARGET_BRANCH in ${Object.keys(branchesToMirror).map(branch => `"${branch}"`).join(' ')}; do
    if git show-ref --verify --quiet refs/heads/\${TARGET_BRANCH}; then
        echo "\${TARGET_BRANCH} branch exists."
    else
        echo "Creating branch \${TARGET_BRANCH}."
        git checkout -b \${TARGET_BRANCH} origin/${productionBranch}
    fi
done

# Switch back to master
git checkout master

# Track whether changes were made
CHANGED_FILES=false

# Sync files from production branch
${syncFileCommands}

# Force merge specific files
${forceMergeCommands}

# If any files have changed, commit the changes
if [ "\$CHANGED_FILES" = true ]; then
    git commit -m "Sync changes from ${productionBranch} and other branches to master (including force merges)"
else
    echo "No changes detected in the specified files."
fi

# Ensure a clean state before syncing the directory
git checkout ${productionBranch}
git reset --hard origin/${productionBranch}

# Update the production branch with contents from the ignored directory
echo "Syncing contents from \${DIRECTORY_TO_SYNC} to ${productionBranch}"

# Remove existing files in the production branch from the ignored directory
rm -rf "\${DIRECTORY_TO_SYNC}/*"

# Copy contents from the master branch's ignored directory to the production branch
git checkout master -- "\${DIRECTORY_TO_SYNC}/."

# Stage and commit the changes to the production branch
git add "\${DIRECTORY_TO_SYNC}"
git commit -m "Update production branch with contents from \${DIRECTORY_TO_SYNC}"

# Push changes to the production branch
git push origin ${productionBranch}

# Mirror changes from dynamically defined branches
for TARGET_BRANCH in ${Object.keys(branchesToMirror).map(branch => `"${branch}"`).join(' ')}; do
    for SOURCE_BRANCH in ${branchesToMirror[TARGET_BRANCH].map(branch => `"${branch}"`).join(' ')}; do
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
`;
};

// Write the generated content to the post-merge hook file
fs.writeFileSync(hookPath, generatePostMergeScript(config));

// Make the hook executable
fs.chmodSync(hookPath, '755');

console.log(`post-merge hook has been successfully created or updated at ${hookPath}`);
