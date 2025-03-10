const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');
const validator = require('../middleware/validator');

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - pseudo
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               pseudo:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       409:
 *         description: Email déjà utilisé
 */
router.post('/register', validator.validateRegistration, userController.register);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtenir la liste des utilisateurs (admin uniquement)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *       403:
 *         description: Non autorisé
 */
router.use(protect); // Appliquer le middleware d'authentification à toutes les routes suivantes

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Obtenir son profil
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil de l'utilisateur
 *       401:
 *         description: Non authentifié
 */
router.get('/profile', userController.getProfile);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtenir un utilisateur par ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur
 *       403:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 * 
 *   put:
 *     summary: Mettre à jour un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               pseudo:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 *       403:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 * 
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       403:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.route('/:id')
  .get(userController.getUserById)
  .put(validator.validateUserUpdate, userController.updateUser)
  .delete(userController.deleteUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtenir la liste des utilisateurs (admin uniquement)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *       403:
 *         description: Non autorisé
 */
router.get('/', admin, userController.getAllUsers);

module.exports = router;
