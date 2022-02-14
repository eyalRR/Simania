

console.log("auth: " , firebase.auth());


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
          console.log('Book deleted with id: ', id);
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
                user.add(``,``,``,id_arr);
                console.log(`index = ${id_arr}, replaced`);
            }
        });

    } catch (error) {
        console.error('Error in replacing user: ', error);
    }
  }

}
//main();


// Query Selectors
const form = document.querySelectorAll('form');
const bars = document.querySelectorAll('.bar');
const progress = document.querySelectorAll('.progress');
let bookName = document.querySelectorAll('.bookName')
let totalPages = document.querySelectorAll('.totalPages');
let pagesRead = document.querySelectorAll('.pagesRead');
let uploadBtn = document.querySelectorAll('.uploadBtn');
let doneBtn = document.querySelectorAll('.doneBtn');
let openBtn = document.querySelectorAll('.openBtn');
const dn_container = document.querySelector('.done-container');
const closeBtn = document.querySelector('.close-window');
const exeBtn = document.querySelector('.execute');
const update_container = document.querySelector('.update-container');


// ADD Event Listeners
form.forEach(form =>{
    form.addEventListener('click',e => {
        e.preventDefault();
    });
}); 

uploadBtn.forEach((upBtn,id) =>{
    upBtn.addEventListener('mouseover', hoverStyle);
    upBtn.addEventListener('mouseout', hoverStyle);
    upBtn.addEventListener('click', uploadPdf);
}); 
doneBtn.forEach((dnBtn,id) =>{
    dnBtn.addEventListener('mouseover', hoverStyle);
    dnBtn.addEventListener('mouseout', hoverStyle);
    dnBtn.addEventListener('click', () =>{
        donePdf(id, book);
    });
}); 
openBtn.forEach((opBtn,id) =>{
    opBtn.addEventListener('mouseover', hoverStyle);
    opBtn.addEventListener('mouseout', hoverStyle);
    opBtn.addEventListener('click', () => {
        openPdf(id);
    });
}); 
closeBtn.addEventListener('click', () =>{
    let dn_popup = dn_container.children[0];
    dn_container.classList.remove('active');
    dn_popup.classList.remove('active');
})
exeBtn.addEventListener('click', () =>{
    let dn_popup = dn_container.children[0];
    dn_container.classList.remove('active');
    dn_popup.classList.remove('active');
    
    id = dn_container.getAttribute("id");
    book.delete(`${id}`);
    book.add("","","",`${id}`);
    refreshBooks();

})
update_container.addEventListener('transitionend', () =>{
    const update_popup = update_container.children[0];
    update_container.classList.remove('active');
    update_popup.classList.remove('active');
})

//FUNCTION DECLARATION
function updateBook(id, book){
    const update_popup = update_container.children[0];
    update_container.classList.add('active');
    update_popup.classList.add('active');
    const bookNameHeader = document.querySelector('.update-popup .book-name')
    bookNameHeader.innerText = bookName[id].value;
}

function hoverStyle(e){
    //console.log(e)
    const btn = e.target;
    const btnName = btn.className;
    if(btn.classList.contains('uploadBtn')){
        btn.classList.toggle('up-hover-js');
    }
    if(btn.classList.contains('doneBtn')){
        btn.classList.toggle('dn-hover-js');
    }
    if(btn.classList.contains('openBtn')){
         //   btn.classList.toggle('op-hover-js');
        btn.style.color = 'rgb(0, 0, 255)';
    }   
}
function uploadPdf(){ //still empty
    
}
function donePdf(id, book){
    const dn_popup = dn_container.children[0];
    dn_container.classList.add('active');
    dn_popup.classList.add('active');
    const bookNameHeader = document.querySelector('.done-popup .book-name')
    bookNameHeader.innerText = bookName[id].value;
    dn_container.setAttribute("id", id);
}
function openPdf(id){
    let pdf = "./pdf/Digital_image_processing_by_Rafael_C._Go.pdf" ;
    window.open(pdf);
}
function refreshBooks(){
    let a = book.getAll();
    console.log(`UPLOAD BOOKS:`);
    let b = a.then(value => { // Value = all books from firestore
        value.forEach((book,id)=>{
            console.log(`${id+1}) ${book.name}`);
            bookName[id].value =book.name;
            totalPages[id].value =book.totalPages;
            pagesRead[id].value =book.pagesRead;
            //Fill Bars
            if(totalPages[id].value !=0){
                let fill = pagesRead[id].value / totalPages[id].value * 100;
                bars[id].style.width = `${fill}%`;
            }
            console.log(totalPages[id].value);
            if(totalPages[id].value === ""){
                let fill = 0;
                bars[id].style.width = `${fill}%`;
            }
        });
        
    });
}

// Main program

const book = new Book();
//book.add(`harry`,`512`,`66`,'2');
//book.replace('1'); //replace in id = 0

//book.add(`forex`,`268`,`66`,'5');

//Upload books from firestore(server) when page refreshed
refreshBooks(book);

  
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

    updateBook(index, book);

    /*const randomTiming = Math.floor((Math.random() * 2) + 2);
    console.log(randomTiming);
    bar.style.transitionDuration = `${randomTiming}s`;
    bar.style.width = '100%';*/
  });
})


