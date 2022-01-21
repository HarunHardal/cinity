export default function SaveDataToLocalStorage(
  type,
  id,
  bg,
  poster,
  title,
  genres
) {

  var list = [];
  var data = {
    type: type,
    id: id,
    bg: bg,
    poster: poster,
    title: title,
    genres: genres,
  };

    list.push(data);
  
  var finalList =
      localStorage.getItem("data") != undefined
      ? [...list, ...JSON.parse(localStorage.getItem("data"))]
      : list
      const uniqueList = Array.from(new Set(finalList.map(a => a.id)))
      .map(id => {
        return finalList.find(a => a.id === id)
      })
  

      localStorage.setItem("data", JSON.stringify(uniqueList))
  
}
/*
    let a = [];
    a.push(data);
    // Parse the serialized data back into an aray of objects
    a = JSON.parse(localStorage.getItem('data')) || [];
    console.log(a , 'SDASDASDASDSAD')
    // Push the new data (whether it be an object or anything else) onto the array
  
    // Alert the array value
    alert(a);  // Should be something like [Object array]
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('data', JSON.stringify(a));
*/
