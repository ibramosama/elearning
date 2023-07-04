import navStyle from './MainNavigation.module.css';
function MainNavigation() {
    return ( 
        <div className={`${navStyle.mainnav} w-100 pt-3 pb-3`}>
            <div className='container-lg container-sm-fluid d-flex align-item-center justify-content-between flex-wrap '>
                <div className='d-flex align-item-center'>
                    <div className={`${navStyle.logo} fs-3 ms-lg-5`}>
                        Edu
                    <span className={`${navStyle.logo_span}`}>Mall</span>
                    </div>
                    <div className={`${navStyle.between_line}`}>|</div>
                    <div className={`${navStyle.search}`}>
                        <input type='text' className={`${navStyle.search_input}`} placeholder='search ...'/>
                    </div>
                </div>
                <div className='d-flex align-item-center me-lg-4'>
                    <div className={`${navStyle.cart_btn}`}>
                        <i className="bi bi-bag-check"></i>
                    </div>
                    <button type="button" className={`btn btn-primary me-3 ${navStyle.sign_btn}`}>Sign In</button>
                    <button type="button" className={`btn btn-primary  ${navStyle.sign_btn}`}>Sign up </button>
                </div>
                
                
            </div>
        </div>
    );  
}

export default MainNavigation;