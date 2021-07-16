import React, {useState, useEffect} from 'react';
import NavBar from '../Nav';
import About from '../About';
// import Projects from '../Login';
import Contact from '../Contact';


function Home(){
    useEffect(() => {
        if(currentPage === 'About'){
            document.title = currentPage
        } else {
            document.title = currentPage.navLink
        }
    });

    const [currentPage, setCurrentPage] = useState('About');

    const writePage = (currentPage) => {
        switch(currentPage.navLink){
            case 'About':
                return <About/>;
            // case 'Login':
            //     return <Login/>;
            case 'Contact':
                return <Contact/>;
            default:
                return <About/>;
        }
    }

    return (
    <div> 
        <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        <div>
            {writePage(currentPage)}
        </div>
    </div>
    )
};

export default Home;