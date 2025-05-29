// Import configuration and Appwrite SDK classes
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

// Define the AuthService class
export class AuthService {
    // Initialize the Appwrite Client and Account
    client = new Client();
    account;

    constructor() {
        // Configure the client with the endpoint and project ID from your conf file
        this.client
            .setEndpoint(conf.appwriteUrl)           // Appwrite backend URL
            .setProject(conf.appwriteProjectId);     // Appwrite project ID
        this.account = new Account(this.client);     // Create an Account instance
    }

    // Create a new user account and auto-login
    async createAccount({ email, password, name }) {
        try {
            // Create a new Appwrite account
            const userAccount = await this.account.create(
                ID.unique(),    // Generate a unique user ID
                email,
                password,
                name
            );

            if (userAccount) {
                // Auto-login after account creation
                return this.login({ email, password });
            } else {
                return userAccount;  // Just return if something's off
            }
        } catch (error) {
            console.log("error in creating account", error);
        }
    }

    // Login with email and password
    async login({ email, password }) {
        try {
            // Create an email-password session
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("error in login", error);
        }
    }

    // Get the currently logged-in user
    async getCurrentuser() {
        try {
            // Fetch the current session's user data
            return await this.account.get();
        } catch (error) {
            console.log("error in getting user", error);
        }
        return null;
    }

    // Logout the user (delete all sessions)
    async logout() {
        try {
            // Remove all active sessions
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("error in logout", error);
        }
    }
}

// Create and export a single instance (singleton pattern)
const authService = new AuthService();
export default authService;
