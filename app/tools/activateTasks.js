export default function activateTasks(key, array) {
  return array.filter((item) => {
    if(item.categoryId == key) {
      return item;
    }
  });
}
