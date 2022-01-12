

console.log(firebase.auth());


async function main() {
  const userObj = new Book();
  console.log(await userObj.getAll());
}


class Book {
  usersRef = db.collection("books");

  async add(name, totalPages, pagesRead, id_arr) {
      const book = { name, totalPages, pagesRead};

      try {
         // const docRef = await this.usersRef.add(user);
          const docRef = await this.usersRef.doc(id_arr).set(book);
          console.log(`Book Added with ID ${id_arr} and name ${name}`);
          //user.id = docRef.id;

      } catch (error) {
          console.error('Error Adding Book: ', error)
      }

      return book;
  }

  async getAll() {
      const books = [];

      try {
          const snapshot = await this.usersRef.get()
          snapshot.forEach(doc => books.push({id: doc.id, ...doc.data()}))
      } catch (err) {
          console.error('Error Getting Books: ', error);
      }

      return books;
  }

  async get(id) {
      let book;

      try {
          let doc = await this.usersRef.doc(id).get();
          
          if(doc.exists) 
              book = {id: doc.id, ...doc.data()};
          else
              console.log('No document found with id: ', id);
      } 
      catch (error) {
          console.error('Error in getting book: ', error);
      }

      return book;
  }

  async delete(id) {
      try {
          await this.usersRef.doc(id).delete();
          console.log('Book is deleted with id: ', id);
      } catch (error) {
          console.error('Error in deleting book: ', error);
      }
  }

  async replace(id_arr) {
    try {
        let a = book.getAll();
        //console.log(a)
        Promise.resolve(a).then(value=>{
        let c = value[id_arr];
        console.log(`collection in place ${id_arr}: `, c);
        if (typeof(c) === `undefined`)
            {
                console.error(`Empty firestore `);
            }else{
                console.log(c);
                user.delete(c.id);
                user.add(`dafa`,`268`,`66`,id_arr);
                console.log(`index = ${id_arr}, replaced`);
            }
        });

    } catch (error) {
        console.error('Error in replacing user: ', error);
    }
  }

}

//main();
const bars = document.querySelectorAll('.bar');
const progress = document.querySelectorAll('.progress');
let bookName = document.querySelectorAll('.bookName')
let totalPages = document.querySelectorAll('.totalPages');
let pagesRead = document.querySelectorAll('.pagesRead');

const book = new Book();
//book.add(`harry`,`512`,`66`,'2');
//book.replace('1'); //replace in id = 0

//book.add(`forex`,`268`,`66`,'5');

//Upload books from firestore(server) when page refreshed
let a = book.getAll();
console.log(`UPLOAD BOOKS`);
let b = a.then(value => {
    value.forEach((book,id)=>{
        console.log(book);
        bookName[id].value =book.name;
        totalPages[id].value =book.totalPages;
        pagesRead[id].value =book.pagesRead;
    })
});

  
bars.forEach((bar, index) => {
  progress[index].addEventListener('mouseover', () => {
    //Update FIRESTORE when hover
    let tPgs = totalPages[index].value;
    let rPgs = pagesRead[index].value;
    let bName = bookName[index].value;

    book.add(bName, tPgs, rPgs, `${index}`);
    //console.log(`index=`, index, 'name=', bName,`total=`, tPgs, `read=`, rPgs);

    let fill = pagesRead[index].value / totalPages[index].value * 100;
    bar.style.width = `${fill}%`;

    

    /*const randomTiming = Math.floor((Math.random() * 2) + 2);
    console.log(randomTiming);
    bar.style.transitionDuration = `${randomTiming}s`;
    bar.style.width = '100%';*/
  });
})

