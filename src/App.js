import './App.sass'
import Header from './components/header'
import Content from './components/content'
import SidebarLeft from './components/sidebar-left'
import SidebarRight from './components/sidebar-right'

function App() {
  return (
    <div className="App">
      <nav>
        <Header/>
      </nav>

      <div>
        <aside>
          <SidebarLeft/>
        </aside>

        <main>
          <Content/>
        </main>

        <aside>
          <SidebarRight/>
        </aside>
      </div>
    </div>
  );
}

export default App;
