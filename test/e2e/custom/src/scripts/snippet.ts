import { Application } from '@hotwired/stimulus';
import { ClipboardController } from 'qux-alias'
import { d } from './globs/d';

d()

ClipboardController.targets.pop()

Application.start();
