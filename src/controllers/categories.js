import category from '../models/category.js';
import { schemaCate } from '../validate/index.js'

const getAll = async (req, res) => {
    try {

        const data = await category.find({})

        if (!data) {
            return res.status(404).json({
                message: "Không tìm thấy danh mục!",
            });
        }

        return res.status(200).json({
            message: "Gọi danh sách danh mục thành công!",
            data
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

const getOne = async (req, res) => {
    try {
        const data = await category.findById(req.params.id).exec();

        if (!data) {
            return res.status(404).json({
                message: "Không tìm thấy danh mục!",
            });
        }
        return res.status(200).json({
            message: "Gọi chi tiết danh mục thành công!",
            data
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

const addCate = async (req, res) => {
    try {

        const { error } = schemaCate.validate(req.body)

        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        } else {
            const data = await category.create(req.body);

            if (!data) {
                return res.status(404).json({
                    message: "Tạo mới danh mục thất bại!",
                });
            }
            return res.status(200).json({
                message: "Tạo mới danh mục thành công!",
                data,
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

const updateCate = async (req, res) => {
    try {
        const body = req.body;
        const { error } = schemaCate.validate(body)
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        } else {
            const data = await category.findByIdAndUpdate(req.params.id, body)

            if (data.acknowledged === false) {
                return res.status(404).json({
                    message: "Cập nhật danh mục thất bại!",
                });
            }

            return res.status(200).json({
                message: "Cập nhật danh mục thành công!",
                data,
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}


const deleteCate = async (req, res) => {
    try {
        const data = await category.findByIdAndDelete(req.params.id)

        if (!data) {
            return res.status(200).json({
                message: "Xóa danh mục thất bại!",
            });
        }

        return res.status(404).json({
            message: "Xoá danh thành công!",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

export default { getAll, getOne, updateCate, deleteCate, addCate }