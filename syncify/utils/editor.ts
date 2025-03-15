import { spawn } from 'node:child_process';

export async function openInEditor (filePath: string) {

  const editor = await this.getEditorPreference();

  if (!editor) {
    throw new Error('No suitable editor found');
  }

  return new Promise((resolve, reject) => {
    try {

      const process = spawn(editor, [ filePath ], {
        stdio: 'ignore',
        detached: true
      });

      process.unref();

      resolve(true);

    } catch (error) {

      reject(new Error(`Failed to open file: ${error.message}`));

    }
  });
}
