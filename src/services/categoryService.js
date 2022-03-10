import Category from '../dao/models/Category.js'

export default class CategoryService {
  async getCategories () {
    return await Category.find()
  }

  async getCategoryById (categoryId) {
    if (!categoryId) throw new Error('Missing \'categoryId\' parameter!')

    const category = await Category.findById(categoryId)
    if (!category) throw new Error('Non-existent category.')

    return category
  }

  async createCategory (name) {
    if (!name) throw new Error('Missing \'name\' parameter!')

    const category = await Category.findOne({ name: { $eq: name } })
    if (category) throw new Error('Category already exists.')

    const createdCategory = await Category.create({ name })
    return createdCategory
  }

  async updateCategoryById (categoryId, name) {
    if (!categoryId || !name) throw new Error('Missing or empty \'categoryId\' or \'name\' category.')

    const category = await Category.findById(categoryId)
    if (!category) throw new Error('Non-existent category.')

    const categoryFound = await Category.findOne({ _id: { $ne: categoryId }, name: { $eq: name } })
    if (categoryFound) throw new Error('Category already exists.')

    const updatedCategory = await Category.findByIdAndUpdate(categoryId, { name }, { new: true })
    return updatedCategory
  }

  async deleteCategoryById (categoryId) {
    if (!categoryId) throw new Error('Missing \'categoryId\' parameter!')

    const category = await Category.findById(categoryId)
    if (!category) throw new Error('Non-existent category.')

    await Category.findByIdAndDelete(categoryId)
  }
}
