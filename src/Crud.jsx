import axios from 'axios';
import { useEffect, useState } from 'react';

const Crud = () => {
  const [product,setProduct] = useState([])
  const [isLoading,isSetloading] = useState(false);
  const [filterProduct,setFilterProduct] = useState([]);
  const [category,setCategory] = useState([]);
  const [search,setSearch] = useState('');
  const [isFound,seIsFound] = useState(false);
  const getData = async()=>{
    isSetloading(true);
    try{
      const data = await axios.get('https://freetestapi.com/api/v1/cars')
      const res = data?.data;
      setProduct(res);
      setFilterProduct(res);
      const categories = [... new Set(res.map((item)=>item.category))];
      setCategory(categories);
      isSetloading(false);
   }
    catch(error){
      console.log(error);
      isSetloading(false);
    }
  }

  const handleValue = (cat)=>{
    if(cat==="All"){
      setFilterProduct(product)
    }
    else{
      const filterdData = product.filter((item)=>item.category === cat);
      setFilterProduct(filterdData)
    }
   
  }

  const handleSearch = ()=>{
    const filterSearch =  filterProduct.filter((item)=>item.model.toLowerCase().includes(search.toLowerCase()))
    if(filterSearch.length===0){
      seIsFound(true);
    }
    else{
      setFilterProduct(filterSearch)
      seIsFound(false);
    }
  }

  const handleEnterSearch = (e)=>{
    if(e.key =="Enter"){
      handleSearch()
    }
  }


  useEffect(()=>{
   getData(); 
  },[])

  return (
    <div>
      {isLoading ? <div className="loader"></div> 
      : 
     <>
      <div>
        <input onKeyDown={handleEnterSearch} value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <select onChange={(e)=>handleValue(e.target.value)}>
          <option value="All">All</option>
          {category.map((item,index)=>{
            return(
              <option key={index} value={item} >{item}</option>
            )
          })}
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>

        {isFound ? <p>No data found</p> : 

    <>
     {filterProduct.map((item)=>{
        const {id, model,image , color , year} = item;
        return(
          <div key={id}>
          <img src={image}/>
          <p>{model}</p>
          <p>{year}</p>
          <p>{color}</p>
          </div>
        )
      })}
     </>
       }
    </>
       } 
    </div>
  );
}

export default Crud;
