import mongoose, { Schema, model, Model } from "mongoose";

export const VIDEO_DIMENTIONS = {
    width: 1080,
    height: 1920,
}as const


export interface IVideo{
    _id?: mongoose.Types.ObjectId;
    title: string; description: string, 
    videoUrl: string;
    thumbnailUrl: string;
    controls?: boolean;
    transformation?:{
        height: number
        width: number;
        quality?: number
        createdAt: Date
        updatedAt: Date
    }
}

const videoSchema = new Schema<IVedio>({
    title: {type: String, required:true},
    description: {type: String, required: true},
    videoUrl:{type: String, required: true},
    controls: {type: Boolean, default: true},
    transformation: {
        height: {type: Number, default: VIDEO_DIMENTIONS.height},
        width: {type: Number, default: VIDEO_DIMENTIONS.width},
        quality: {type: Number, min: 1, max: 100}
    },
},{timestamps: true})

const Video: Model<IVideo> = mongoose.models.video || model<IVideo>("video", videoSchema);

export default Video;
