// Import required modules from Appwrite SDK and configuration
import conf from "../conf/conf";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

// Service class to handle Appwrite operations
export class Service {
    client = new Client();   // Initialize Appwrite client
    databases;               // Will hold an instance of Appwrite Databases
    bucket;                  // Will hold an instance of Appwrite Storage

    constructor() {
        // Configure the Appwrite client
        this.client
            .setEndpoint(conf.appwriteUrl)             // Backend endpoint URL
            .setProject(conf.appwriteProjectId);       // Project ID
        this.databases = new Databases(this.client);   // Initialize database instance
        this.bucket = new Storage(this.client);        // Initialize storage instance
    }

    // 📝 Create a new post document using a unique `slug` as the document ID
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,           // Database ID
                conf.appwriteCollectionId,         // Collection ID
                slug,                              // Document ID (must be unique)
                { title, content, featuredImage, status, userId } // Document data
            );
        } catch (error) {
            console.log("error in creating post", error);
        }
    }

    // 🔁 Update a post document by its `slug`
    async updatePost(slug, { title, content, featuredImage, status, userId }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status, userId }
            );
        } catch (error) {
            console.log("error in updating post", error);
        }
    }

    // ❌ Delete a post by its `slug`
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("error in deleting post", error);
            return false;
        }
    }

    // 🔍 Get a single post by its `slug`
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("error in getting post", error);
        }
    }

    // 📋 Get all posts with optional filters and sorting
    async getAllPosts({ isActive = null, userId = null, limit = null, offset = null, search = null, sort = 'Latest' }) {
        try {
            const queries = [];

            if (isActive != null)
                queries.push(Query.equal('status', isActive ? "active" : "inactive"));

            if (userId != null)
                queries.push(Query.equal('userId', userId));

            if (limit != null)
                queries.push(Query.limit(limit));

            if (offset != null)
                queries.push(Query.offset(offset));

            if (search != null)
                queries.push(Query.contains('title', search));

            // Sort by created date
            queries.push(sort === 'Latest' ? Query.orderDesc('$createdAt') : Query.orderAsc('$createdAt'));

            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("error in getting all posts", error);
            return false;
        }
    }

    // 📤 Upload a file (used for featured images)
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,    // Bucket ID
                ID.unique(),              // Generate unique file ID
                file                      // Actual file object (e.g., from input[type="file"])
            );
        } catch (error) {
            console.log("error in uploading file", error);
            return false;
        }
    }

    // ❌ Delete a file from storage using its fileId (used for featuredImage)
    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
        } catch (error) {
            console.log("error in deleting file", error);
        }
    }

    // 👁 Get a publicly viewable preview URL for a file
    getFilePreview(fileId) {
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        );
    }
}

// Create and export a singleton instance of the service
const service = new Service();
export default service;
