import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useMemo, useState, useEffect, memo } from "react"
import Select from "react-select";

/* UNE LIGNE du tableau (un employé) suite au info saisies dans le formulary */
const EmployeeRow = memo(({ employee }) => (
  <tr>
    <td>{employee.firstName}</td>
    <td>{employee.lastName}</td>
    <td>{employee.startDate}</td>
    <td>{employee.department}</td>
    <td>{employee.dateOfBirth}</td>
    <td>{employee.street}</td>
    <td>{employee.city}</td>
    <td>{employee.state}</td>
    <td>{employee.zipCode}</td>
  </tr>
))

const EmployeeList = () => {
  //Ma récup de la liste d’employés depuis Redux
  const employees = useSelector((state) => state.employees.items)

  // Hooks principaux pour l'affichage du tableau
  const [pageSize, setPageSize] = useState(10) // nb de lignes visibles lors de son affichage
  const [page, setPage] = useState(0) // page actuelle (0 = première)
  const [search, setSearch] = useState("") // INput de texte de recherche
  const [sortConfig, setSortConfig] = useState({
    field: "firstName", // colonne triée
    direction: "ascending", // sens du tri pour mon affichage de mon tableau 
  })

  // Fonction utilitaire pour comparer les textes en minuscules
  const normalize = (v) => (v ?? "").toString().toLowerCase()

  // Filtrage des employés selon la recherche
  const filteredEmployees = useMemo(() => {
    const request = search.trim().toLowerCase()
    if (!request) return employees
    return employees.filter((emp) =>
      [
        emp.firstName,
        emp.lastName,
        emp.startDate,
        emp.department,
        emp.dateOfBirth,
        emp.street,
        emp.city,
        emp.state,
        emp.zipCode,
      ]
        .map(normalize)
        .some((value) => value.includes(request))
    )
  }, [employees, search])

  // Tri du tableau selon la colonne cliquée
  const sortedEmployees = useMemo(() => {
    if (!sortConfig?.field || !sortConfig?.direction) return filteredEmployees
    const dir = sortConfig.direction === "ascending" ? 1 : -1
    const field = sortConfig.field

    return [...filteredEmployees].sort((a, b) => {
      const va = normalize(a[field])
      const vb = normalize(b[field])
      if (va < vb) return -1 * dir
      if (va > vb) return 1 * dir
      return 0
    })
  }, [filteredEmployees, sortConfig])

  // Nbre de page du tableau 
  const totalPages = Math.max(1, Math.ceil(sortedEmployees.length / pageSize))

  // Si on réduit le nb total de pages par un filter → on revient à la première
  useEffect(() => {
    if (page >= totalPages) setPage(0)
  }, [totalPages, page])

  // Extraction des lignes afficher pour la page du tableau 
  const start = page * pageSize
  const visibleEmployees = sortedEmployees.slice(start, start + pageSize)
  const from = sortedEmployees.length === 0 ? 0 : start + 1
  const to = Math.min(sortedEmployees.length, start + pageSize)

  // Fonction pour changer le tri 
  const handleSortClick = (field) => {
    setSortConfig((prev) => {
      if (!prev || prev.field !== field) return { field, direction: "ascending" } // - 1er clic: tri croissant (ascending)
      if (prev.direction === "ascending") return { field, direction: "descending" } // - 2e clic: tri décroissant (descending)
      return { field: null, direction: null } // - 3e clic: pas de tri (retour neutre)
    })
    setPage(0) // - On remets la pagination à 0 pour éviter une page vide
  }

  // Afficher une flèche selon le sens du tri
  const sortIndicator = (field) => {
    if (sortConfig.field !== field) return "▲" 
    return sortConfig.direction === "ascending" ? "▲" : "▼"
  }

  //Pagination intelligente (Choix max 3 pages visibles dans le visuel)
  const visiblePageCount = 3
  let startPage = Math.max(0, page - 1)
  let endPage = Math.min(totalPages, startPage + visiblePageCount)
  if (endPage - startPage < visiblePageCount && startPage > 0) {
    startPage = Math.max(0, endPage - visiblePageCount)
  }
  const visiblePages = Array.from({ length: endPage - startPage }, (_, i) => startPage + i)

  return (
    <div id="employee-div" className="container">
      {/* Title Page */}
      <h3>Current Employees</h3>

      {employees.length === 0 ? (
        <p>No employees at the moment.</p>
      ) : (
        <>
          {/* Bandeau du haut "Show X entries" + "Search" */}
          <div className="table-controls">
            <div className="table-show-entries">
              <label>
                Show{" "}
                <select
                  value={pageSize}
                  classNamePrefix="react-select"
                  onChange={(e) => {
                    setPageSize(Number(e.target.value))
                    setPage(0)
                  }}
                >
                  {[5, 10, 25, 50, 100].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>{" "}
                Entries
              </label>
            </div>

            {/* Text search box for table */}
            <div className="table-search">
              <label>
                Search:{" "}
                <input
                  type="search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(0)
                  }}
                />
              </label>
            </div>
          </div>

          {/* The Table */}
          <table id="employee-table" className="display">
            <thead>
              <tr>
                {[
                  "firstName",
                  "lastName",
                  "startDate",
                  "department",
                  "dateOfBirth",
                  "street",
                  "city",
                  "state",
                  "zipCode",
                ].map((field) => (
                  <th
                    key={field}
                    onClick={() => handleSortClick(field)}
                    className={
                      sortConfig.field === field
                        ? sortConfig.direction === "ascending"
                          ? "sorted-asc"
                          : "sorted-desc"
                        : ""
                    }
                  >
                    <span className="th-content">

                      {/* Cell title of table */}
                      <span className="th-label">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </span>

                      {/* Arrow ▲ or ▼ depending on the state */}
                      <span className="th-arrow">{sortIndicator(field)}</span>
                    </span>

                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Display of employees on the page */}
              {visibleEmployees.map((emp) => (
                <EmployeeRow
                  key={emp.id ?? `${emp.firstName}-${emp.lastName}-${emp.startDate}`}
                  employee={emp}
                />
              ))}
            </tbody>
          </table>

          {/* Footer Table */}
          <div className="table-footer">
            <div className="table-info">
              {`Showing ${from} to ${to} of ${sortedEmployees.length} entries`}
            </div>

            {/* Page : Previous … 1 2 3 … Next */}
            <div className="table-pagination">
              <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>
                Previous
              </button>

              {startPage > 0 && <span className="dots">…</span>}

              {visiblePages.map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={num === page ? "current-page" : ""}
                >
                  {num + 1}
                </button>
              ))}

              {endPage < totalPages && <span className="dots">…</span>}

              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      <div>
        <Link className="home-link" to="/">
          Home
        </Link>
      </div>
    </div>
  )
}

export default EmployeeList
