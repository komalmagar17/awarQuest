/**
 * Extended puzzle types: sudoku, jigsaw, number series, crossword, schedule, logical reasoning.
 */
window.PuzzleRenderers = {};

function puzzleBtn(text, onClick) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'puzzle-option';
  btn.textContent = text;
  btn.addEventListener('click', onClick);
  return btn;
}

function puzzleInput(placeholder) {
  const input = document.createElement('input');
  input.className = 'puzzle-input';
  input.placeholder = placeholder;
  return input;
}

window.PuzzleRenderers['number-series'] = function renderNumberSeries(body, puzzle, feedback, continueBtn, onSuccess, onFail) {
  body.innerHTML = `<p class="puzzle-prompt">${escapeHtml(puzzle.prompt || 'Find the next number in the series (SSC pattern):')}</p>
    <div class="puzzle-series">${escapeHtml(puzzle.display)}</div>`;
  const input = puzzleInput('Your answer');
  const submit = puzzleBtn('Submit Answer', () => {
    const val = input.value.trim();
    if (String(puzzle.answer) === val) {
      input.disabled = true;
      submit.disabled = true;
      showFeedback(feedback, true, '✓ Correct! Pattern cracked — just like SSC number series.', puzzle.skillTip);
      continueBtn.classList.remove('hidden');
      continueBtn.onclick = onSuccess;
      window.dispatchEvent(new CustomEvent('game:xp', { detail: { amount: 60, label: 'Logic bonus' } }));
    } else {
      if (onFail) onFail('Look at differences between terms — try again.', puzzle.skillTip);
      else showFeedback(feedback, false, 'Look at differences between terms — try again.', puzzle.skillTip);
    }
  });
  body.appendChild(input);
  body.appendChild(submit);
};

window.PuzzleRenderers['logical-reasoning'] = function renderLogicalReasoning(body, puzzle, feedback, continueBtn, onSuccess, onFail) {
  body.innerHTML = `<div class="logic-stem">${escapeHtml(puzzle.stem)}</div>`;
  puzzle.options.forEach((opt) => {
    body.appendChild(puzzleBtn(opt.text, () => {
      body.querySelectorAll('.puzzle-option').forEach(b => b.disabled = true);
      if (opt.correct) {
        showFeedback(feedback, true, '✓ Sound reasoning — UPSC-style logic holds.', puzzle.skillTip);
        continueBtn.classList.remove('hidden');
        continueBtn.onclick = onSuccess;
        window.dispatchEvent(new CustomEvent('game:xp', { detail: { amount: 65, label: 'Reasoning bonus' } }));
      } else {
        if (onFail) onFail('That conclusion does not follow. Re-read the statements.', puzzle.skillTip);
        else showFeedback(feedback, false, 'That conclusion does not follow. Re-read the statements.', puzzle.skillTip);
        setTimeout(() => body.querySelectorAll('.puzzle-option').forEach(b => { b.disabled = false; }), 1800);
      }
    }));
  });
};

window.PuzzleRenderers['sudoku-mini'] = function renderSudokuMini(body, puzzle, feedback, continueBtn, onSuccess, onFail) {
  const size = 4;
  const solution = puzzle.solution;
  const givens = puzzle.givens;
  body.innerHTML = '<p class="puzzle-prompt">Mini Sudoku — fill empty cells (1–4, no repeats in rows/columns).</p>';
  const grid = document.createElement('div');
  grid.className = 'sudoku-grid sudoku-4';
  const inputs = [];

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const cell = document.createElement('input');
      cell.type = 'text';
      cell.maxLength = 1;
      cell.inputMode = 'numeric';
      cell.className = 'sudoku-cell';
      const key = `${r},${c}`;
      if (givens[key] != null) {
        cell.value = givens[key];
        cell.disabled = true;
        cell.classList.add('given');
      }
      inputs.push({ el: cell, r, c });
      grid.appendChild(cell);
    }
  }
  body.appendChild(grid);

  const submit = puzzleBtn('Check Sudoku', () => {
    let ok = true;
    inputs.forEach(({ el, r, c }) => {
      if (el.disabled) return;
      if (String(solution[r][c]) !== el.value.trim()) ok = false;
    });
    if (ok) {
      inputs.forEach(({ el }) => { el.disabled = true; });
      submit.disabled = true;
      showFeedback(feedback, true, '✓ Sudoku solved! Structured thinking wins.', puzzle.skillTip);
      continueBtn.classList.remove('hidden');
      continueBtn.onclick = onSuccess;
        window.RewardFX?.xpBurst(70, 'Sudoku bonus');
        window.RewardFX?.confetti(12);
    } else {
      if (onFail) onFail('Some cells are wrong — check rows, columns, and boxes.', puzzle.skillTip);
      else showFeedback(feedback, false, 'Some cells are wrong — check rows and columns.', puzzle.skillTip);
    }
  });
  body.appendChild(submit);
};

window.PuzzleRenderers['crossword-fill'] = function renderCrosswordFill(body, puzzle, feedback, continueBtn, onSuccess, onFail) {
  body.innerHTML = `<p class="puzzle-prompt">${escapeHtml(puzzle.prompt)}</p>`;
  const wrap = document.createElement('div');
  wrap.className = 'crossword-wrap';
  const answers = {};
  puzzle.clues.forEach((clue, i) => {
    const row = document.createElement('div');
    row.className = 'crossword-row';
    row.innerHTML = `<span class="crossword-num">${i + 1}.</span> <span class="crossword-clue">${escapeHtml(clue.hint)}</span>`;
    const input = puzzleInput('Answer');
    input.dataset.idx = i;
    row.appendChild(input);
    wrap.appendChild(row);
    answers[i] = clue.answer.toLowerCase();
  });
  body.appendChild(wrap);
  const submit = puzzleBtn('Check Crossword', () => {
    let ok = true;
    wrap.querySelectorAll('.puzzle-input').forEach((inp) => {
      const idx = inp.dataset.idx;
      if (inp.value.trim().toLowerCase() !== answers[idx]) ok = false;
    });
    if (ok) {
      wrap.querySelectorAll('.puzzle-input').forEach(inp => { inp.disabled = true; });
      submit.disabled = true;
      showFeedback(feedback, true, '✓ All words fit — vocabulary unlocked!', puzzle.skillTip);
      continueBtn.classList.remove('hidden');
      continueBtn.onclick = onSuccess;
      window.dispatchEvent(new CustomEvent('game:xp', { detail: { amount: 55, label: 'Word bonus' } }));
    } else {
      if (onFail) onFail('Some answers are incorrect — rethink the clues.', puzzle.skillTip);
      else showFeedback(feedback, false, 'Some answers are incorrect — rethink the clues.', puzzle.skillTip);
    }
  });
  body.appendChild(submit);
};

window.PuzzleRenderers['jigsaw-slide'] = function renderJigsawSlide(body, puzzle, feedback, continueBtn, onSuccess) {
  body.innerHTML = `<p class="puzzle-prompt">${escapeHtml(puzzle.prompt || 'Slide tiles to restore the message (click a tile next to the empty space).')}</p>`;
  const tiles = [...puzzle.tiles];
  let empty = tiles.indexOf(0);
  const board = document.createElement('div');
  board.className = 'jigsaw-board';

  function renderBoard() {
    board.innerHTML = '';
    tiles.forEach((t, i) => {
      const tile = document.createElement('button');
      tile.type = 'button';
      tile.className = 'jigsaw-tile' + (t === 0 ? ' empty' : '');
      tile.textContent = t === 0 ? '' : (puzzle.labels[t] || t);
      if (t !== 0) {
        tile.addEventListener('click', () => {
          const er = Math.floor(empty / 3), ec = empty % 3;
          const tr = Math.floor(i / 3), tc = i % 3;
          if (Math.abs(er - tr) + Math.abs(ec - tc) !== 1) return;
          tiles[empty] = tiles[i];
          tiles[i] = 0;
          empty = i;
          renderBoard();
          if (tiles.every((v, idx) => v === puzzle.solution[idx])) {
            board.querySelectorAll('.jigsaw-tile').forEach(b => { b.disabled = true; });
            showFeedback(feedback, true, '✓ Picture complete! Patience and planning pay off.', puzzle.skillTip);
            continueBtn.classList.remove('hidden');
            continueBtn.onclick = onSuccess;
            window.dispatchEvent(new CustomEvent('game:xp', { detail: { amount: 65, label: 'Jigsaw bonus' } }));
          }
        });
      }
      board.appendChild(tile);
    });
  }
  renderBoard();
  body.appendChild(board);
};

window.PuzzleRenderers['schedule-grid'] = function renderScheduleGrid(body, puzzle, feedback, continueBtn, onSuccess, onFail) {
  body.innerHTML = `<p class="puzzle-prompt">${escapeHtml(puzzle.prompt)}</p>
    <p class="puzzle-sub">Drag each task to the best time slot — core time management!</p>`;
  const pool = document.createElement('div');
  pool.className = 'schedule-pool';
  pool.innerHTML = '<span class="schedule-label">Tasks</span>';
  const slots = document.createElement('div');
  slots.className = 'schedule-slots';
  const assigned = {};

  puzzle.tasks.forEach((task) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'schedule-task';
    chip.textContent = task.label;
    chip.draggable = true;
    chip.dataset.taskId = task.id;
    chip.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', task.id);
      chip.classList.add('dragging');
    });
    chip.addEventListener('dragend', () => chip.classList.remove('dragging'));
    pool.appendChild(chip);
  });

  puzzle.slots.forEach((slot) => {
    const box = document.createElement('div');
    box.className = 'schedule-slot';
    box.dataset.slotId = slot.id;
    box.innerHTML = `<span class="slot-time">${escapeHtml(slot.time)}</span><span class="slot-name">${escapeHtml(slot.label)}</span><div class="slot-drop">Drop task here</div>`;
    box.addEventListener('dragover', (e) => { e.preventDefault(); box.classList.add('over'); });
    box.addEventListener('dragleave', () => box.classList.remove('over'));
    box.addEventListener('drop', (e) => {
      e.preventDefault();
      box.classList.remove('over');
      const taskId = e.dataTransfer.getData('text/plain');
      assigned[slot.id] = taskId;
      box.querySelector('.slot-drop').textContent = puzzle.tasks.find(t => t.id === taskId)?.label || taskId;
      pool.querySelector(`[data-task-id="${taskId}"]`)?.remove();
    });
    slots.appendChild(box);
  });

  body.appendChild(pool);
  body.appendChild(slots);

  const submit = puzzleBtn('Lock My Schedule', () => {
    const correct = puzzle.correct;
    const ok = Object.keys(correct).every(k => assigned[k] === correct[k])
      && Object.keys(assigned).length === Object.keys(correct).length;
    if (ok) {
      submit.disabled = true;
      showFeedback(feedback, true, '✓ Perfect schedule! You protected study time and avoided the trap.', puzzle.skillTip);
      continueBtn.classList.remove('hidden');
      continueBtn.onclick = onSuccess;
      window.dispatchEvent(new CustomEvent('game:xp', { detail: { amount: 80, label: 'Time master' } }));
    } else {
      if (onFail) onFail('That schedule wastes time or hits the trap zone — rethink priorities.', puzzle.skillTip);
      else showFeedback(feedback, false, 'That schedule wastes time or falls into the trap — rethink priorities.', puzzle.skillTip);
    }
  });
  body.appendChild(submit);
};

window.PuzzleRenderers['math-marathon'] = function renderMathMarathon(body, puzzle, feedback, continueBtn, onSuccess, onFail) {
  body.innerHTML = `<p class="puzzle-prompt">${escapeHtml(puzzle.prompt)}</p>`;
  const wrap = document.createElement('div');
  wrap.className = 'math-marathon-wrap';
  const inputs = [];
  puzzle.problems.forEach((prob, i) => {
    const row = document.createElement('div');
    row.className = 'math-row';
    row.innerHTML = `<span class="math-q">${i + 1}. ${escapeHtml(prob.q)}</span>`;
    const inp = puzzleInput('Answer');
    inputs.push({ inp, prob });
    row.appendChild(inp);
    wrap.appendChild(row);
  });
  body.appendChild(wrap);
  const submit = puzzleBtn('Submit All Answers', () => {
    let correct = 0;
    inputs.forEach(({ inp, prob }) => {
      const val = inp.value.trim().toLowerCase();
      const ok = (prob.accept || [String(prob.a)]).some((a) => String(a).toLowerCase() === val);
      if (ok) correct += 1;
      inp.classList.toggle('math-wrong', !ok);
    });
    const need = puzzle.required || puzzle.problems.length;
    if (correct >= need) {
      inputs.forEach(({ inp }) => { inp.disabled = true; });
      submit.disabled = true;
      showFeedback(feedback, true, `All ${need} solved! Your mind beats scam pressure.`, puzzle.skillTip);
      continueBtn.classList.remove('hidden');
      continueBtn.onclick = onSuccess;
      window.RewardFX?.xpBurst(90, 'Matiks master');
      window.RewardFX?.confetti(20);
    } else if (onFail) {
      onFail(`Only ${correct}/${need} correct — redo all carefully.`, puzzle.skillTip);
    }
  });
  body.appendChild(submit);
};

window.PuzzleRenderers['sudoku-6'] = function renderSudoku6(body, puzzle, feedback, continueBtn, onSuccess, onFail) {
  const size = 6;
  const solution = puzzle.solution;
  const givens = puzzle.givens || {};
  body.innerHTML = '<p class="puzzle-prompt">6×6 Sudoku — fill 1–6 with no repeats in rows, columns, or 2×3 boxes.</p>';
  const grid = document.createElement('div');
  grid.className = 'sudoku-grid sudoku-6';
  const inputs = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const cell = document.createElement('input');
      cell.type = 'text';
      cell.maxLength = 1;
      cell.inputMode = 'numeric';
      cell.className = 'sudoku-cell';
      const key = `${r},${c}`;
      if (givens[key] != null) {
        cell.value = givens[key];
        cell.disabled = true;
        cell.classList.add('given');
      }
      inputs.push({ el: cell, r, c });
      grid.appendChild(cell);
    }
  }
  body.appendChild(grid);
  const submit = puzzleBtn('Verify Sudoku', () => {
    let ok = true;
    inputs.forEach(({ el, r, c }) => {
      if (el.disabled) return;
      if (String(solution[r][c]) !== el.value.trim()) ok = false;
    });
    if (ok) {
      inputs.forEach(({ el }) => { el.disabled = true; });
      submit.disabled = true;
      showFeedback(feedback, true, '6×6 Sudoku cracked! Calm logic wins.', puzzle.skillTip);
      continueBtn.classList.remove('hidden');
      continueBtn.onclick = onSuccess;
      window.RewardFX?.xpBurst(100, 'Sudoku expert');
      window.RewardFX?.confetti(18);
    } else if (onFail) {
      onFail('Grid has errors — check each 2×3 box and row.', puzzle.skillTip);
    }
  });
  body.appendChild(submit);
};

window.PuzzleRenderers['jigsaw-4x4'] = function renderJigsaw4x4(body, puzzle, feedback, continueBtn, onSuccess) {
  const size = puzzle.size || 4;
  body.innerHTML = `<p class="puzzle-prompt">${escapeHtml(puzzle.prompt || 'Slide tiles to solve the 4×4 puzzle.')}</p>`;
  const solution = [...puzzle.solution];
  const tiles = [...solution];
  let empty = tiles.indexOf(0);
  for (let m = 0; m < 80; m++) {
    const neighbors = [];
    const er = Math.floor(empty / size), ec = empty % size;
    if (er > 0) neighbors.push(empty - size);
    if (er < size - 1) neighbors.push(empty + size);
    if (ec > 0) neighbors.push(empty - 1);
    if (ec < size - 1) neighbors.push(empty + 1);
    const pick = neighbors[Math.floor(Math.random() * neighbors.length)];
    tiles[empty] = tiles[pick];
    tiles[pick] = 0;
    empty = pick;
  }
  const board = document.createElement('div');
  board.className = 'jigsaw-board jigsaw-4';

  function renderBoard() {
    board.innerHTML = '';
    tiles.forEach((t, i) => {
      const tile = document.createElement('button');
      tile.type = 'button';
      tile.className = 'jigsaw-tile' + (t === 0 ? ' empty' : '');
      tile.textContent = t === 0 ? '' : (puzzle.labels?.[t] || t);
      if (t !== 0) {
        tile.addEventListener('click', () => {
          const er = Math.floor(empty / size), ec = empty % size;
          const tr = Math.floor(i / size), tc = i % size;
          if (Math.abs(er - tr) + Math.abs(ec - tc) !== 1) return;
          tiles[empty] = tiles[i];
          tiles[i] = 0;
          empty = i;
          renderBoard();
          if (tiles.every((v, idx) => v === puzzle.solution[idx])) {
            board.querySelectorAll('.jigsaw-tile').forEach(b => { b.disabled = true; });
            showFeedback(feedback, true, 'Message restored! Verify in your real bank app.', puzzle.skillTip);
            continueBtn.classList.remove('hidden');
            continueBtn.onclick = onSuccess;
            window.RewardFX?.xpBurst(95, 'Jigsaw master');
            window.RewardFX?.confetti(22);
          }
        });
      }
      board.appendChild(tile);
    });
  }
  renderBoard();
  body.appendChild(board);
};

window.PuzzleRenderers['brain-ops'] = function renderBrainOps(body, puzzle, feedback, continueBtn, onSuccess, onFail) {
  body.innerHTML = `<p class="puzzle-prompt">${escapeHtml(puzzle.prompt)}</p>`;
  const row = document.createElement('div');
  row.className = 'brain-ops-row';
  const selects = [];

  (puzzle.parts || []).forEach((part) => {
    if (part === '?') {
      const sel = document.createElement('select');
      sel.className = 'brain-ops-select';
      (puzzle.ops || ['+', '−', '×', '÷']).forEach((op) => {
        const opt = document.createElement('option');
        opt.value = op;
        opt.textContent = op;
        sel.appendChild(opt);
      });
      selects.push(sel);
      row.appendChild(sel);
    } else {
      const span = document.createElement('span');
      span.className = 'brain-ops-part';
      span.textContent = part;
      row.appendChild(span);
    }
  });
  body.appendChild(row);

  const submit = puzzleBtn(window.i18n?.t('puzzleLocked') || 'Lock My Answer', () => {
    const chosen = selects.map((s) => s.value);
    const ok = JSON.stringify(chosen) === JSON.stringify(puzzle.answers);
    if (ok) {
      selects.forEach((s) => { s.disabled = true; });
      submit.disabled = true;
      showFeedback(feedback, true, '✓ Correct! Your brain found the pattern.', puzzle.skillTip, puzzle.resources);
      continueBtn.classList.remove('hidden');
      continueBtn.onclick = onSuccess;
      window.RewardFX?.xpBurst(75, 'Brain puzzle');
    } else if (onFail) {
      onFail('Wrong operations — try a different combination.', puzzle.skillTip);
    } else {
      showFeedback(feedback, false, 'Wrong operations — try again.', puzzle.skillTip);
    }
  });
  body.appendChild(submit);
};
