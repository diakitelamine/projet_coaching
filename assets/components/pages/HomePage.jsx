import React from 'react';

const HomePage = (props)=>{ 
    return (
        <div>
            
            <div className="container container-min">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <div className="col">
                        <div className="home-page-card card text-center h-100 ">
                        <div className="card-body">
                            <div className="round"><img src="./uploads/icons/cardio.png"/></div>
                            <h5 className="card-title mt-3">Cardio</h5>
                            <p className="card-text  mt-3">
                                Le cardio est l'une des meilleures choses que vous puissiez faire pour votre santé globale. 
                                Il renforce votre cœur, améliore votre circulation sanguine, augmente votre endurance et vous aide à brûler des calories et à perdre du poids.
                            </p>
                        </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="home-page-card card text-center h-100">
                        
                        <div className="card-body">
                        <div className="round"><img src="./uploads/icons/recette.png"/></div>
                            <h5 className="card-title mt-3">Recettes</h5>
                            <p className="card-text  mt-3">
                                Manger sainement est l'une des clés pour maintenir une bonne santé physique et mentale. 
                                Les aliments sains apportent les nutriments dont notre corps a besoin pour fonctionner de manière optimale. 
                                Il est important de varier notre alimentation pour obtenir un éventail complet de nutriments.
                            </p>
                        </div>
                        
                        </div>
                    </div>
                    <div className="col">
                        <div className="home-page-card card text-center h-100">
                            <div className="card-body">
                            <div className="round"><img src="./uploads/icons/musculation.png"/></div>
                                <h5 className="card-title mt-3">Musculation</h5>
                                <p className="card-text mt-3">
                                    La musculation est un moyen efficace pour renforcer et tonifier les muscles, améliorer la densité osseuse, augmenter la force et l'endurance, et même brûler des calories. 
                                    Cependant, il est important de suivre une approche saine pour la musculation afin de maximiser les résultats.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                
            </div>
        </div>
    )
}
export default HomePage;
