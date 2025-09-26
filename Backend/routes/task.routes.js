const express = require('express');
const { Task, PRIORITIES, STATUSES } = require('../models/task.model');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

/**
 * POST /tasks
 * body: { title, description?, dueDate?, priority? }
 */
router.post('/', async (req, res) => {
  try {
    const {
      title = '',
      description = '',
      dueDate,
      priority = 'medium',
    } = req.body || {};

    if (!title || title.trim().length < 1 || title.trim().length > 120) {
      return res.status(400).json({
        error: {
          message: 'Title is required (1-120 chars)',
          code: 'VALIDATION_ERROR',
        },
      });
    }
    if (priority && !PRIORITIES.includes(priority)) {
      return res.status(400).json({
        error: { message: 'Invalid priority', code: 'VALIDATION_ERROR' },
      });
    }

    let parsedDue = undefined;
    if (dueDate) {
      const d = new Date(dueDate);
      if (isNaN(d.getTime())) {
        return res.status(400).json({
          error: { message: 'Invalid dueDate', code: 'VALIDATION_ERROR' },
        });
      }
      parsedDue = d;
    }

    const task = await Task.create({
      userId: req.user.id,
      title: title.trim(),
      description: description?.trim(),
      dueDate: parsedDue,
      priority,
      status: 'pending',
    });

    return res.status(201).json({ task });
  } catch (err) {
    console.error('CREATE_TASK_ERROR', err);
    return res.status(500).json({
      error: { message: 'Server error creating task', code: 'SERVER_ERROR' },
    });
  }
});

/**
 * GET /tasks
 * query: status, priority
 */
router.get('/', async (req, res) => {
  try {
    const {
      status,
      priority,
      q,
      dueFrom,
      dueTo,
      page = '1',
      limit = '10',
      sort = '-createdAt',
    } = req.query;

    const filter = { userId: req.user.id };

    if (status && status !== 'all') {
      if (!STATUSES.includes(status)) {
        return res.status(400).json({
          error: { message: 'Invalid status', code: 'VALIDATION_ERROR' },
        });
      }
      filter.status = status;
    }

    if (priority) {
      if (!PRIORITIES.includes(priority)) {
        return res.status(400).json({
          error: { message: 'Invalid priority', code: 'VALIDATION_ERROR' },
        });
      }
      filter.priority = priority;
    }

    if (q && String(q).trim().length > 0) {
      const regex = new RegExp(String(q).trim(), 'i');
      filter.$or = [{ title: regex }, { description: regex }];
    }

    if (dueFrom || dueTo) {
      filter.dueDate = {};
      if (dueFrom) {
        const dFrom = new Date(dueFrom);
        if (isNaN(dFrom.getTime())) {
          return res.status(400).json({
            error: {
              message: 'Invalid dueFrom date',
              code: 'VALIDATION_ERROR',
            },
          });
        }
        filter.dueDate.$gte = dFrom;
      }
      if (dueTo) {
        const dTo = new Date(dueTo);
        if (isNaN(dTo.getTime())) {
          return res.status(400).json({
            error: { message: 'Invalid dueTo date', code: 'VALIDATION_ERROR' },
          });
        }
        filter.dueDate.$lte = dTo;
      }
      if (Object.keys(filter.dueDate).length === 0) delete filter.dueDate;
    }

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);

    const [total, data] = await Promise.all([
      Task.countDocuments(filter),
      Task.find(filter)
        .sort(sort)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    return res.status(200).json({
      data,
      page: pageNum,
      limit: limitNum,
      total,
      totalPages,
    });
  } catch (err) {
    console.error('LIST_TASKS_ERROR', err);
    return res.status(500).json({
      error: { message: 'Server error fetching tasks', code: 'SERVER_ERROR' },
    });
  }
});

/**
 * GET /tasks/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!task) {
      return res.status(404).json({
        error: { message: 'Task not found', code: 'NOT_FOUND' },
      });
    }
    return res.status(200).json({ task });
  } catch (err) {
    console.error('GET_TASK_ERROR', err);
    return res.status(400).json({
      error: { message: 'Invalid task id', code: 'VALIDATION_ERROR' },
    });
  }
});

/**
 * PATCH /tasks/:id
 */
router.patch('/:id', async (req, res) => {
  try {
    const update = {};
    const { title, description, dueDate, priority, status } = req.body || {};

    if (title !== undefined) {
      if (!title || title.trim().length < 1 || title.trim().length > 120) {
        return res.status(400).json({
          error: {
            message: 'Title must be 1-120 chars',
            code: 'VALIDATION_ERROR',
          },
        });
      }
      update.title = title.trim();
    }
    if (description !== undefined) {
      update.description = String(description).trim();
    }
    if (dueDate !== undefined) {
      if (dueDate === null || dueDate === '') {
        update.dueDate = undefined;
      } else {
        const d = new Date(dueDate);
        if (isNaN(d.getTime())) {
          return res.status(400).json({
            error: { message: 'Invalid dueDate', code: 'VALIDATION_ERROR' },
          });
        }
        update.dueDate = d;
      }
    }
    if (priority !== undefined) {
      if (!PRIORITIES.includes(priority)) {
        return res.status(400).json({
          error: { message: 'Invalid priority', code: 'VALIDATION_ERROR' },
        });
      }
      update.priority = priority;
    }
    if (status !== undefined) {
      if (!STATUSES.includes(status)) {
        return res.status(400).json({
          error: { message: 'Invalid status', code: 'VALIDATION_ERROR' },
        });
      }
      update.status = status;
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: update },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        error: { message: 'Task not found', code: 'NOT_FOUND' },
      });
    }

    return res.status(200).json({ task });
  } catch (err) {
    console.error('UPDATE_TASK_ERROR', err);
    return res.status(400).json({
      error: { message: 'Invalid request', code: 'VALIDATION_ERROR' },
    });
  }
});

/**
 * PATCH /tasks/:id/toggle
 * flips status pending <-> completed
 */
router.patch('/:id/toggle', async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!task) {
      return res.status(404).json({
        error: { message: 'Task not found', code: 'NOT_FOUND' },
      });
    }
    task.status = task.status === 'completed' ? 'pending' : 'completed';
    await task.save();
    return res.status(200).json({ task });
  } catch (err) {
    console.error('TOGGLE_TASK_ERROR', err);
    return res.status(400).json({
      error: { message: 'Invalid task id', code: 'VALIDATION_ERROR' },
    });
  }
});

/**
 * DELETE /tasks/:id
 */
router.delete('/:id', async (req, res) => {
  try {
    const result = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!result) {
      return res.status(404).json({
        error: { message: 'Task not found', code: 'NOT_FOUND' },
      });
    }
    return res.status(204).send();
  } catch (err) {
    console.error('DELETE_TASK_ERROR', err);
    return res.status(400).json({
      error: { message: 'Invalid task id', code: 'VALIDATION_ERROR' },
    });
  }
});

module.exports = router;
