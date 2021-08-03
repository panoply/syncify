import indexOf from 'lodash.indexof';
import inquirer from 'inquirer';
import { CLIOptions, IConfigFile, ITarget } from '../typings';

/**
 * Target
 */
export async function getTarget (
  config: IConfigFile,
  options: CLIOptions,
  target = null
): Promise<ITarget> {

  const target_name = options.target || null;

  if (Array.isArray(config.targets)) {

    if (target_name) {

      target = config.targets.find((t) => Object.is(t.target_name, target_name));

      if (!target) {
        throw new Error(`Could not find target '${target_name}'`);
      }

    } else {

      const choices = config.targets.map((
        {
          target_name,
          theme_name,
          domain
        }
      ) => `[${target_name}] - '${theme_name}' at ${domain}.myshopify.com`);

      if (config.targets.length > 1) {

        const choice = await inquirer.prompt(
          [
            {
              type: 'list',
              name: 'target',
              message: 'Select target',
              default: null,
              choices
            }
          ]
        );

        target = config.targets[indexOf(choices, choice.target)];

      } else if (config.targets.length === 1) {
        target = config.targets[0];
      }
    }
  } else {

    throw new Error('No targets defined in the \'.shopifysync\' file');
  }

  const buffer = Buffer.from(`${target.api_key}:${target.password}`);

  target.auth = `Basic ${buffer.toString('base64')}`;

  return target;

}
