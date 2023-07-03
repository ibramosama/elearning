function CourseSections() {
    return ( <div>
        <h4 className="mb-4 ">Curriculum</h4>
        <div class="accordion" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Inroduction to Data mining
                    </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <ul class="list-group">
                            <li class="list-group-item p-3">
                                <i class="bi bi-play-circle me-3"></i>
                                An item
                            </li>
                            <li class="list-group-item p-3">
                                <i class="bi bi-play-circle me-3"></i>
                                An item
                            </li>
                            <li class="list-group-item p-3">
                                <i class="bi bi-play-circle me-3"></i>
                                An item
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
            
            
        </div>
    </div> );
}

export default CourseSections;