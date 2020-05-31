import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import * as fs from 'fs';
import { join } from 'path';
import { get } from 'lodash';
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

  // Comment this out if your command does not require an org username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    let jsonPath = `${join(process.cwd(), 'details.json')}`;
    let json: any = await readFile(jsonPath, 'utf-8')
    //this.ux.log('Data in JSON File is ' + json);
    this.ux.log('plugins.prefix value is : '+get(json, 'plugins.prefix', this.flags.prefix));
    // Return an object to be displayed with --json
    return { Data : json };
  }
}