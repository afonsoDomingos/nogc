import mongoose, { Schema, model, models } from "mongoose";

const ContentSchema = new Schema(
  {
    hero: {
      tag_en: { type: String, required: true },
      tag_pt: { type: String, required: true },
      titleLine1_en: { type: String, required: true },
      titleLine1_pt: { type: String, required: true },
      titleLine2_en: { type: String, required: true },
      titleLine2_pt: { type: String, required: true },
      sub_en: { type: String, required: true },
      sub_pt: { type: String, required: true },
      bgImage: { type: String, required: true },
    },
    services: [
      {
        title_en: { type: String, required: true },
        title_pt: { type: String, required: true },
        description_en: { type: String, required: true },
        description_pt: { type: String, required: true },
      }
    ],
    projects: [
      {
        title_en: { type: String, required: true },
        title_pt: { type: String, required: true },
        category_en: { type: String, required: true },
        category_pt: { type: String, required: true },
        location_en: { type: String, required: true },
        location_pt: { type: String, required: true },
        description_en: { type: String, required: true },
        description_pt: { type: String, required: true },
        image: { type: String, required: true },
      }
    ],
    news: [
      {
        category_en: { type: String, required: true },
        category_pt: { type: String, required: true },
        date_en: { type: String, required: true },
        date_pt: { type: String, required: true },
        title_en: { type: String, required: true },
        title_pt: { type: String, required: true },
        description_en: { type: String, required: true },
        description_pt: { type: String, required: true },
      }
    ]
  },
  { timestamps: true }
);

const Content = models.Content || model("Content", ContentSchema);
export default Content;
