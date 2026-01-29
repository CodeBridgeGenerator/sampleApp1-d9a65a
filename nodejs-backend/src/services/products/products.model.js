
    module.exports = function (app) {
        const modelName = "products";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            productCode: { type: Number, comment: "Product Code, p_number, false, false, false, false, false, false, false, , , , ," },
name: { type: [Schema.Types.ObjectId], ref: "objects", description: "isArray", comment: "Name, multiselect, false, true, true, true, true, true, true, objects, objects, one-to-many, name," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };