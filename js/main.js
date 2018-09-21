//listen for form submit
document.getElementById('myform').addEventListener('submit', savebk);

//save bookmark
function savebk(e){
    // get form values
    var sitename= document.getElementById('sitename').value;
    var siteurl=document.getElementById('siteurl').value;
    // run validate function and if not true return false
    if(!validate(sitename,siteurl)){
        return false;
    }
    
    var bookmark={
        name: sitename,
        url: siteurl
    }
    
    // test if bookmark is null
    if (localStorage.getItem('bookmarks')=== null){
        //intial array
        var bookmarks=[];
        // add bookmark obj to array
        bookmarks.push(bookmark);
        //set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }else{
        // if something is in storage
        // get bookmark from local
        var bookmarks =JSON.parse(localStorage.getItem('bookmarks'));
        // add bookmark to array
        bookmarks.push(bookmark);
        // re set back to local
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    
    // clear form .reset is already a fucntion
    document.getElementById('myform').reset();
    
    // re get  bookmarks so that dont have to reload page
    getbookmarks();
    
    /*
    // local storage test
    localStorage.setItem('test',"hello world");
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
    
    */
    
    //prevent form from submiting
    e.preventDefault();
}
// delete bookmark
function deletee(url){
    // get bookmarks from local
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    //loop through bookmarks
    for(var i=0; i<bookmarks.length;i++){
        if(bookmarks[i].url == url){
            //remove from array
            bookmarks.splice(i,1);
        }
    }
    //outside loop re set back to local
 localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    
    // re get  bookmarks so that dont have to reload page
    getbookmarks();
    
}

// fetch bookmarks to show
function getbookmarks(){
    // get bookmarks from local
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    // get output id
    var bookmarkresults=document.getElementById('bookmarksResults')
    // build output
    bookmarkresults.innerHTML= '';
    for(var i=0; i< bookmarks.length;i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        
        bookmarkresults.innerHTML += '<div class= "jumbotron">'+'<h3>'+name+
    '<a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a>'+
    '<a onclick="deletee(\''+url+'\')" class="btn btn-danger"  href="#">Delete</a>'+
        '</h3>'+'</div>';
    }
    
}
// to validate form
function validate(sitename, siteurl){
     // to check it iputs are empty
    if(!sitename || !siteurl){
        alert("please fill in the form");
        // so it stops submiting
        return false; 
    }
    
    // to validate if url has http. google regex url and get vars
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    
    var regex = new RegExp(expression);
    //check if url doesnt match
    if(!siteurl.match(regex)){
        alert("please use a valid url");
        return false;
    }
    return true;
}