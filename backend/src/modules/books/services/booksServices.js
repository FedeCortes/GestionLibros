import Book from '../model/Book';

export async function bookCreateOne({author, title, description, year, genre, rating, numPages, format}) {
  return await Book.create({
    author,
    title,
    description,
    year,
    genre,
    rating,
    numPages,
    format,
  })
}

export async function booksFetch(author, title, page= 1, limit= 5, filters) {
  let query = {}
  if(author) query["author"]=author
  if(title) query["title"]=title
  if(filters){
    if(filters.busqueda){
      query["$or"]=[{
          author:{
            $regex: filters.busqueda,
            $options: 'i'
          }
        },{
          title:{
            $regex: filters.busqueda,
            $options: 'i'
          }
        }
      ]
    }
    if(filters.genero){
      query["genre"] = filters.genero;
    }
    if(filters.formato){
      query["format"] = filters.formato;
    }
    if(filters.estrellas){
      query["rating"] = filters.estrellas;
    }
    if (filters.genero) {
      query["genre"] = filters.genero;
    }

    if (filters.min && filters.max) {
      query["numPages"] = {
        $gte: filters.min,
        $lte: filters.max
      };
    } else if (filters.min) {
      query["numPages"] = {
        $gte: filters.min
      };
    } else if (filters.max) {
      query["numPages"] = {
        $lte: filters.max
      };
    }
  }
  return await Book.paginate(query, {page, limit})
}

export async function bookFindById(id) {
  return await Book.findById(id)
}

export async function deleteBookById(id) {
  return await Book.findByIdAndDelete(id)
}

export async function bookFindByIdAndUpdate(id, author, title, description, year, genre, rating, numPages, format) {
  return await Book.findByIdAndUpdate(id, {
    author,
    title,
    description,
    year,
    genre,
    rating,
    numPages,
    format,
  })
}
