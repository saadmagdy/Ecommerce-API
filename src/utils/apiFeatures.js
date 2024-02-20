class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }
  paginate() {
    // 1- Pagination
    let page = this.queryString.page * 1 || 1;
    this.page = page;
    if (this.queryString.page <= 0) page = 1;
    let limit = 50;
    let skip = (page - 1) * limit;
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    return this;
  }
  filter() {
    // 2- Filter
    let filterObj = { ...this.queryString };
    let exculudeQuery = ["page", "sort", "fields", "keyword"];
    exculudeQuery.forEach((e) => {
      delete filterObj[e];
    });
    filterObj = JSON.stringify(filterObj);
    filterObj = filterObj.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filterObj = JSON.parse(filterObj);
    this.mongooseQuery = this.mongooseQuery.find(filterObj);
    return this;
  }
  sort() {
    // 3- Sort
    if (this.queryString.sort) {
      let sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    }
    return this;
  }
  search(modelName) {
    // 4- Search
    if (this.queryString.keyword) {
      let query = {};
      if (modelName === "Products") {
        query.$or = [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { description: { $regex: this.queryString.keyword, $options: "i" } },
        ];
      } else {
        query = { name: { $regex: this.queryString.keyword, $options: "i" } };
      }
      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }
  //   if (this.queryString.keyword) {
  //     this.mongooseQuery = this.mongooseQuery.find({
  //       $or: [
  //         { title: { $regex: this.queryString.keyword, $options: "i" } },
  //         { description: { $regex: this.queryString.keyword, $options: "i" } },
  //       ],
  //     });
  //   }
  //   return this;
  // }

  fields() {
    // -5 Selected Fields
    if (this.queryString.fields) {
      let fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    }
    return this;
  }
}

export default ApiFeatures;
