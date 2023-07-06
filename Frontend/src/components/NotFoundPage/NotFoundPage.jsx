import E404 from './NotFoundPage.module.css'
function NotFoundPage() {
    return ( 
        <div className={`${E404.bad} text-center vh-100`}>
            <div className={E404.msg}>404 not Found This page !</div>
        </div>
    );
}

export default NotFoundPage;