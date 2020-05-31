// Import All Required Modules
import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import * as fs from 'fs';
import { join } from 'path';
import { promisify } from 'util';
const readFile = promisify(fs.readFile)
// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('aakashCli_1', 'org');

export default class read extends SfdxCommand {

  public static description = messages.getMessage('readJsonFile');

  public static examples = [
  `This Command will read JSON file data and display the it in Key:Value pair format
  sfdx Aakash:File:read -n <Parameter Value to Read>
  `
  ];


  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    prefix: flags.string({
      char: 'n',
      required: true,
      description: messages.getMessage("readJsonFile")
  }),
  };
  public async run(): Promise<AnyJson> {
    let jsonPath = `${join(process.cwd(), 'details.json')}`;
    let json: any = await readFile(jsonPath, 'utf-8');
    this.ux.log('Data in JSON File is ' + JSON.parse(json).myName);
    //this.ux.log('plugins.prefix value is : '+get(json,''));
    // Return an object to be displayed with --json
    return { Data : json };
  }
}
