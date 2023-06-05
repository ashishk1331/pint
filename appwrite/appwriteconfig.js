import { Account,Client,Databases } from "appwrite";
const client=new Client();
export const databases = new Databases(client);
import { variables } from "./variables";
client
.setEndpoint(variables.APPWRITE_ENDPOINT)
.setProject(variables.APPWRITE_SECRETKEY);

export const account= new Account(client);