import sashimiDemo from '../IMG/sashimiDemo.jpg'
import Image from 'next/image';
import { getImages } from './utils';
import { useContext } from 'react'
import { DataContext } from '../providers';

const ImgSlider = () => {
    const dataContext = useContext(DataContext);
    if (!dataContext) { return null; }
    const { recipeList } = dataContext;

    const getImagesFromRecipeList = (imgURL: string | undefined) => {
        return getImages(imgURL);
    }
    return recipeList.length > 0 ? (
        <main>
            <div className="row justify-content-center" style={{ marginTop: '1%', zIndex: 100 }}>
                <div className="col-md-7">
                    <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active" data-bs-interval="10000">
                                <Image src={sashimiDemo} className="d-block w-100" alt="SpaghettiRecipeImg" style={{ width: "100%", height: "300px", overflow: "hidden", objectFit: "cover" }} />
                            </div>
                            {recipeList.map((recipe, index) => {
                                return (
                                    <div className="carousel-item" key={index}>
                                        <img src={getImagesFromRecipeList(recipe.imgURL)} className="d-block w-100" alt="SpaghettiRecipeImg" style={{ width: "100%", height: "300px", overflow: "hidden", objectFit: "cover" }} />
                                    </div>
                                )
                            })}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>

    ) : <></>;
}

export default ImgSlider;