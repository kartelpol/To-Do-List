export default function customizeCategory(category, key, property, value) {
  return category.map((item) => {
  if(item.key == key) {
    item[property] = value;            
  } else {
    item[property] = !value;
    if(item.nests.length) {
      item.nests = customizeCategory(item.nests, key, property, value);
    }
  }
  return item;
  });
  }
