import conf from "../conf/conf";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";


export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // slug is the document id it is unique
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("error in creating post", error);
        }
    }

    // slug is the document id it is unique
    async updatePost(slug, { title, content, featuredImage, status, userId }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("error in updating post", error);
        }


    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("error in deleting post", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("error in getting post", error);
        }
    }

    async getAllPosts({ isActive = null, userId = null, limit = null, offset = null, search = null, sort = 'Latest' }) {
        try {
            const queries = []
            if (isActive != null) queries.push(Query.equal('status', isActive ? "active" : "inactive"))
            if (userId != null) queries.push(Query.equal('userId', userId))
            if (limit != null) queries.push(Query.limit(limit))
            if (offset != null) queries.push(Query.offset(offset));
            if (search != null) queries.push(Query.contains('title', search))
            queries.push(sort == 'Latest' ? Query.orderDesc('$createdAt') : Query.orderAsc('$createdAt'))
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("error in getting all posts", error);
            return false
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )

        } catch (error) {
            console.log("error in uploading file", error);
            return false;
        }
    }

    // here the fileId is the unique id of the file which is featuredImage
    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("error in deleting file", error);

        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        )

    }

}

const service = new Service();

export default service;















