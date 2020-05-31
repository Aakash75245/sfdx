import { SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import * as simplegit from 'simple-git/promise';

const git = simplegit();
// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('aakashCli_1', 'org');

export default class Org extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `Git commit
  `
  ];
  public async run() {
    let message = 'Pushing changes through Plugins';
    await git.raw(['status']);
    await git.raw(['add','.']);
    let res : any = await git.commit(message);
    this.ux.log(res);
    await git.raw(['push','origin', 'master']);
  }
}
