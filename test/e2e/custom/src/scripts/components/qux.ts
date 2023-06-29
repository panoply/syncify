import { ClipboardController } from 'qux-alias'

export default function () {

  ClipboardController.targets.push('foo')

  return 'qux';
}
