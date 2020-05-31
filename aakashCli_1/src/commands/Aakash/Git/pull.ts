import { SfdxCommand,flags, FlagsConfig } from '@salesforce/command';
import { Messages,Connection,Org } from '@salesforce/core';
import * as simplegit from 'simple-git/promise';

const git = simplegit();
// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('aakashCli_1', 'org');

export default class pull extends SfdxCommand {

    private appC: Org
    private conn: Connection
  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `Git commit
  `
  ];
  protected static flagsConfig: FlagsConfig = {

    releasename: flags.string({
        char: 'n',
        required: true,
        description: 'App Prefix goes here'
    }),

    verbose: flags.builtin()
}
  public async run() {
    this.appC = await Org.create({ aliasOrUsername: this.flags.org })
        this.conn = this.appC.getConnection();
        let query = `select id,name,AA_myPackages__Reference__c from AA_myPackages__Release__c where name = '${this.flags.releasename}'`;
        this.ux.log(query);
        let res1: any = await this.conn.query(query);
        let stashrefrence = res1.records[0].AA_myPackages__Reference__c;
        this.ux.log('Refrence is ' + stashrefrence);
    //let message = 'Pushing changes through Plugins';
    git.checkout('master')
                .then(() => git.pull('origin', 'master', stashrefrence))
    //await git.raw(['add','.']);
    //let res : any = await git.commit(message);
    //this.ux.log(res);
    //await git.raw(['push','origin', 'master']);
  }
}
