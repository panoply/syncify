import { Application } from '@hotwired/stimulus';
import { ClipboardController } from 'qux-alias'

ClipboardController.targets.pop()

Application.start();
