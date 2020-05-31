import { SfdxCommand,flags, FlagsConfig } from '@salesforce/command';
import { Messages,Connection,Org } from '@salesforce/core';
import {ApexExecuteCommand} from 'salesforce-alm/dist/commands/force/apex/execute'
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
        required: false,
        description: 'App Prefix goes here'
    }),
    targetname: flags.string({
      char: 't',
      required: false,
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
        //let gitcommand = `FETCH_HEAD -- ${stashrefrence}`;
    //let message = 'Pushing changes through Plugins';
    //git.raw(['fetch']);
    await git.fetch([]);
    try{
      await git.raw(['checkout','FETCH_HEAD','--',stashrefrence]);
      this.ux.log(` File ${stashrefrence} pulled from Git `);
      this.ux.log('lets execute apex class which we just pulled ');      
      await ApexExecuteCommand.run(['-u',this.flags.targetname,'-f',stashrefrence]);
    }
    catch(error)
  {
    this.ux.log('Error here is ' + error);
  }
  
    //.then(() => git.raw([` -- ${stashrefrence}`]))
    //git.raw([gitcommand]);
    //await git.raw(['add','.']);
    //let res : any = await git.commit(message);
    //this.ux.log(res);
    //await git.raw(['push','origin', 'master']);
  }
}
