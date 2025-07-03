enum enumUserRoles {
	ADMIN = "admin",
	USER = "user", // Usuário Simples Tacito
	PUBLIC = "public", // Usuário Público Tacito
	MANAGER = "manager", // Gestor
	MANAGER_SHIFT = "manager_shift", // Gestor de Turno
	MANAGER_FOCAL = "manager_focal", // Gestor Ponto Focal
	RH_LOCAL = "rh_local", // RH Local
	RH_CORPORATE = "rh_corporate", // RH Corporativo
	ADMIN_CORPORATE = "admin_corporate", // Admin Corporativo
	CONSULTANT_SITUATED = "consultant_situated", // Consultor Situado
	MASTER_SITUATED = "master_situated" // Master Situado
}

export default enumUserRoles;
