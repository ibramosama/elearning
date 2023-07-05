function CourseSections(props) {
    return ( 
    <div>
        <h4 className="mb-4 ">Curriculum</h4>
        
        {  props.data.sections.map((section,key) =>(
            <div className="accordion" id={`accordionExample${key}`} key={key}>
            <div className="accordion-item">
                <h2 className="accordion-header" id={`headingOne${key}`}>
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne${key}`} aria-expanded="true" aria-controls={`collapseOne${key}`}>
                        {section?.section}
                    </button>
                </h2>
                <div id={`collapseOne${key}`} className="accordion-collapse collapse " aria-labelledby={`headingOne${key}`} data-bs-parent={`#accordionExample${key}`}>
                    <div className="accordion-body">
                        
                        <ul className="list-group">
                            
                            {section.videos.map((video,key)=>(
                                <li className="list-group-item p-3" key={key}>
                                    <i className="bi bi-play-circle me-3"></i>
                                    {video}
                                </li>
                            ))}
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        ))}
            
        
    </div> 
    );
}

export default CourseSections;