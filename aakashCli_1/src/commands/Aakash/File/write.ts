// Import All Required Modules
import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import * as fs from 'fs';
import { join } from 'path';
import {set} from 'lodash';
// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('aakashCli_1', 'org');

export default class write extends SfdxCommand {

  public static description = messages.getMessage('readJsonFile');

  public static examples = [
  `This Command will write into JSON file data and display the it in Key:Value pair format
  sfdx Aakash:File:write -n <New Value>
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
    let json = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    set(json,'myName',this.flags.prefix);
    fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2), 'utf-8')    
    return { Data : json };
  }
}
