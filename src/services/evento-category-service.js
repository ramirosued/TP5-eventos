import EventCategoryRepository from "../repositories/evento-category-repository.js";
export default class EventCategoryService {
  getAllAsync = async () => {
    const repo = new EventCategoryRepository();
    const arrayEventCategory = await repo.getAllAsync();
    let resArray;
    if (arrayEventCategory != "") {
      resArray = [arrayEventCategory, 200];
    } else {
      resArray = ["No se encuentran provincias", 404];
    }
    return resArray;
  };
  getByIdAsync = async (id) => {
    const repo = new EventCategoryRepository();
    const arrayEventCategory = await repo.getByIdAsync(id);
    return arrayEventCategory
  };
  createAsync = async (body) => {
    const repo = new EventCategoryRepository();
    let resArray = repo.createEventCategory(body);
    return resArray;
  };
  putAsync = async (body) => {
    const repo = new EventCategoryRepository();
    let resArray = repo.putEventCategory(body);
    return resArray;
  };
  deleateAsync = async (id) => {
    const repo = new EventCategoryRepository();
    let resArray = repo.deleateEventCategory(id);
    return resArray;
  };
}