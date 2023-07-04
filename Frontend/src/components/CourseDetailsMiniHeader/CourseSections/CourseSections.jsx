function CourseSections(props) {
    return ( 
    <div>
        <h4 className="mb-4 ">Curriculum</h4>
        
        {  props.data.sections.map((section,key) =>(
            <div class="accordion" id={`accordionExample${key}`} key={key}>
            <div class="accordion-item">
                <h2 class="accordion-header" id={`headingOne${key}`}>
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne${key}`} aria-expanded="true" aria-controls={`collapseOne${key}`}>
                        {section?.section}
                    </button>
                </h2>
                <div id={`collapseOne${key}`} class="accordion-collapse collapse " aria-labelledby={`headingOne${key}`} data-bs-parent={`#accordionExample${key}`}>
                    <div class="accordion-body">
                        
                        <ul class="list-group">
                            
                            {section.videos.map((video,key)=>(
                                <li class="list-group-item p-3" key={key}>
                                    <i class="bi bi-play-circle me-3"></i>
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