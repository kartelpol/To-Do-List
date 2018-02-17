  export const categorySearcher = (obj, key) => {
    let category = false;
    obj.forEach((item) => {
      if(item.key == key) category = true;
      else if(item.nests.length) {
        if(this.categorySearcher(item.nests, key)){
          category = true;
        }
      }
    });
    return category;
  }