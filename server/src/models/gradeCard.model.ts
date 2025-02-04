import mongoose, { Schema, Document } from "mongoose";

export interface IGradeCard extends Document {
  corporateFinance: number;
  investmentAnalysis: number;
  financialAccounting: number;
  riskManagement: number;
  internationalFinance: number;
}

const GradeCardSchema: Schema = new Schema({
  corporateFinance: { type: Number, required: true },
  investmentAnalysis: { type: Number, required: true },
  financialAccounting: { type: Number, required: true },
  riskManagement: { type: Number, required: true },
  internationalFinance: { type: Number, required: true }
});


const GradeCardModel = mongoose.model<IGradeCard>("GradeCard", GradeCardSchema);
export default GradeCardModel;
